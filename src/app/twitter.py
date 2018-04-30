import get_sentiment


company = "Slack"
api = get_sentiment.TwitterClient()
company_sent = api.get_company_sentiment_descriptor(company)
print(company_sent[1])
