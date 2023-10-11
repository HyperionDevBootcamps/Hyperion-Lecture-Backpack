import spacy

class FAQDetector():

    questions = []
    answers = []
    
    def __init__(self, file):
        self.nlp = spacy.load('en_core_web_lg')

        for line in file:
            question, answer = line.strip().split(';')
            self.questions.append(question)
            self.answers.append(answer) 

    def _determine_closest_similarity(self, user_input, questions=questions):
        user_input = self.nlp(user_input)
        similarities = []
        for question in questions:
            similarity = user_input.similarity(self.nlp(question))
            similarities.append(similarity)
        index = similarities.index(max(similarities))
        return index

    def get_most_similar_question(self, user_input, questions=questions, answers=answers):
        index = self._determine_closest_similarity(user_input)
        return [questions[index],answers[index]]

    # print(get_most_similar_question("cancel order"))
