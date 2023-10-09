import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

# Load spaCy's English language model
nlp = spacy.load("en_core_web_sm")

# Sample movie reviews and their corresponding labels
reviews = [
    ("This movie is amazing!", "positive"),
    ("I hated this film.", "negative"),
    ("The acting was superb.", "positive"),
    ("It was a waste of time.", "negative"),
    ("I would rewacth this movie anytime.", "positive"),
    ("This was a terrible movie", "negative"),
    ("I had so much fun watching this film.", "positive"),
    ("I nver want to watch this movie again.", "negative"),
    ("Please make another movie as I would love to see more.", "positive"),
    ("I did not like this film at all.", "negative"),
]

# Split the data into text and labels
texts, labels = zip(*reviews)

# Preprocess the text data using spaCy
processed_texts = []
for text in texts:
    doc = nlp(text)
    processed_texts.append(" ".join([token.lemma_ for token in doc]))

# Convert text data to TF-IDF features
tfidf_vectorizer = TfidfVectorizer()
X_train_tfidf = tfidf_vectorizer.fit_transform(processed_texts)

# Train a Multinomial Naive Bayes classifier
classifier = MultinomialNB()
classifier.fit(X_train_tfidf, labels)

def make_prediction(text, classifier=classifier, tfidf_vectorizer=tfidf_vectorizer):
    if text:
        text = " ".join([token.lemma_ for token in nlp(text)])
        return classifier.predict(tfidf_vectorizer.transform([text]))[0]
    return  None
