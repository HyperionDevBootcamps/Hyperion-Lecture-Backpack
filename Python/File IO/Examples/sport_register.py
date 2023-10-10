def print_users(data):
    for user in data:
        print(user)

def get_sport_total(data):
    sports = {}
    for value in data.values():
        sport = value[0]
        if sports.get(sport):
            sports[sport] += 1
        else:
            sports[sport] = 1
    return sports

def add_entry(user, sport, code, data):
    if user and sport and len(code)==6:
        data[user] = [sport, code]
        

def update_text_file(file_name, data):
    with open(file_name, 'w', encoding='utf-8') as file:
        for entry in data.items():
            user, details = entry
            file.write(f"{user},{details[0]},{details[1]}\n")


def main():
    input_file = open('entries.txt', 'r', encoding='utf-8')

    entries = {}

    for line in input_file:
        name, sport, code = line.strip().split(',')
        entries[name] = [sport, code]

    print_users(entries)
    print(get_sport_total(entries))
    add_entry("James Peters", "Rugby", "938462", entries)
    update_text_file('entries.txt', entries)

if __name__ == "__main__":
    main()