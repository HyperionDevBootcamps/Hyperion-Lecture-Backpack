const dayjs = require('dayjs')
const Payout = {
  generate: (pastjobs, isDriver) => {
    let routeJobs = pastjobs.filter((x) => x.chargeType.name == 'ROUTE')

    //This is where we do calculations for individual jobs
    let collectedJobs = []

    pastjobs.forEach((pastjob) => {
      if (pastjob.chargeType.name != 'STAT') {
        collectedJobs.push(pastjob)
      } else {
        // Special check for STAT jobs only
        let statPastJobDestination =
          pastjob.Tasks[pastjob.Tasks.length - 1].addressLocation
        let sameDestination = false
        routeJobs.forEach((routejob) => {
          let routePastJobDestination =
            routejob.Tasks[routejob.Tasks.length - 1].addressLocation
          if (
            statPastJobDestination.Latitude ==
              routePastJobDestination.Latitude &&
            statPastJobDestination.Longitude ==
              routePastJobDestination.Longitude
          ) {
            console.log('Found route job with same destination')
            sameDestination = true
          }
        })
        if (!sameDestination) {
          console.log('No  route job with same destination')
          let routeJobWithSameStop = null
          pastjob.Tasks.forEach((task) => {
            let location = task.addressLocation
            routeJobs.forEach((rj) => {
              rj.Tasks.forEach((t) => {
                if (
                  t.addressLocation.Latitude == location.Latitude &&
                  t.addressLocation.Longitude == location.Longitude
                ) {
                  routeJobWithSameStop = rj
                }
              })
            })
          })

          if (routeJobWithSameStop != null) {
            console.log('Found route job with same stop')
            let statJobStartTime = dayjs(pastjob.start_time)
            let routeJobStartTime = dayjs(routeJobWithSameStop.start_time)
            let isStopStateAwaiting =
              statJobStartTime.isBefore(routeJobStartTime)
            if (isStopStateAwaiting == false) {
              console.log('stop state is not awaiting adding to list')
              collectedJobs.push(pastjob)
            }
          } else {
            console.log('No routeJobWithSameStop found adding to list')
            collectedJobs.push(pastjob)
          }
        }
      }
    })

    let calculations = collectedJobs.map((cj) => {
      let x = {}
      x.numberOfStops = cj.Tasks.length

      x.miles = parseFloat(cj.distanceTravelled)

      if (isDriver) {
        x.totalMiles =
          parseFloat(cj.distanceTravelled) *
          cj.chargeType.mileage_rate *
          cj.Driver.commission
        x.perStopTotal =
          cj.Tasks.length * cj.chargeType.stop_rate * cj.Driver.commission
        x.commissionRate = cj.Driver.commission
      } else {
        x.perStopTotal = cj.Tasks.length * cj.chargeType.stop_rate
        x.totalMiles =
          parseFloat(cj.distanceTravelled) * cj.chargeType.mileage_rate
      }

      x.totalAmount = x.perStopTotal + x.totalMiles

      x.heading = cj.department?.departmentName ?? cj.customer.name
      x.chargeType = cj.chargeType.name
      x.endDate = cj.endDate.toISOString().split('T')[0]
      x.start_time = cj.start_time.toISOString()
      x.stopRate = cj.chargeType.stop_rate
      x.mileageRate = cj.chargeType.mileage_rate

      return x
    })

    let calculationsGrouped = calculations.reduce((pv, { heading, ...r }) => {
      if (!pv[heading]) {
        pv[heading] = { table_name: heading, table_data: [r] }
      } else {
        pv[heading].table_data.push(r)
      }
      return pv
    }, {})

    calculationsGrouped = Object.values(calculationsGrouped)
    calculationsGrouped.forEach((x) => {
      x.table_data = x.table_data.reduce(
        (pv, { endDate, chargeType, start_time, ...r }) => {
          const key = `${endDate}-${chargeType}-${start_time}`
          pv[key] = pv[key] || { endDate, chargeType, start_time, ...r }
          pv[key].miles += r.miles
          pv[key].totalMiles += r.totalMiles
          pv[key].numberOfStops += r.numberOfStops
          pv[key].perStopTotal += r.perStopTotal
          pv[key].stopRate = r.stopRate
          pv[key].mileageRate = r.mileageRate
          if (isDriver) {
            pv[key].commissionRate = r.commissionRate
          }
          pv[key].totalAmount += r.totalAmount
          return pv
        },
        {}
      )
      x.table_data = Object.values(x.table_data)
    })
    calculationsGrouped.forEach((x) => {
      x.table_sum = x.table_data.reduce((pv, cv) => {
        return pv + cv.totalAmount
      }, 0)
      x.table_sum = `Total amount: $${x.table_sum}`
    })

    //Decorate headers
    calculationsGrouped.forEach((x) => {
      x.table_data = x.table_data.map((d) => {
        let row = {}
        row['Date'] = dayjs(d.endDate).format('DD/MM/YY')
        row['Start time'] = dayjs(d.start_time).utc(false).format('hh:mm A')
        row['Service'] = d.chargeType
        row['Miles'] = d.miles
        row['$Mile'] = d.mileageRate
        row['Total Miles'] = d.totalMiles
        row['Stops'] = d.numberOfStops
        row['Base Price'] = d.stopRate
        row['Total Stops'] = d.perStopTotal
        row['Commision'] = d.commissionRate
        row['Amount'] = d.totalAmount
        return row
      })
    })

    return calculationsGrouped
  },
}
module.exports = Payout
