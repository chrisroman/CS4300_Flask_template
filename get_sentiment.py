import re
import tweepy
import sys
from tweepy import OAuthHandler
from textblob import TextBlob
 
class TwitterClient(object):
    '''
    Generic Twitter Class for sentiment analysis.
    Code modified from https://www.geeksforgeeks.org/twitter-sentiment-analysis-using-python/
    '''
    def __init__(self):
        '''
        Class constructor or initialization method.
        '''
        # keys and tokens from the Twitter Dev Console
        api_key = 'mabJ5Hs9iaLL3oUnEGJmeGURu'
        api_secret = 'TKxoibLLCDtp8hiXOaLy60DsvPsZePga5Ig4qUw62xP5QuZxdS'
        access_token = '985548524518608896-47tQqjE4L3u1FC8k53AC7TpOmXCbDnQ'
        access_token_secret = 'WQUEYIBb07MoJVVjqGx6DtV5nle8IdIDTW0QsTXUQ7aNa'
 
        # attempt authentication
        try:
            # create OAuthHandler object
            self.auth = OAuthHandler(api_key, api_secret)
            # set access token and secret
            self.auth.set_access_token(access_token, access_token_secret)
            # create tweepy API object to fetch tweets
            self.api = tweepy.API(self.auth)
        except:
            print("Error: Authentication Failed")
 
    def clean_tweet(self, tweet):
        '''
        Utility function to clean tweet text by removing links, special characters
        using simple regex statements.
        '''
        return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", str(tweet)).split())
 
    def get_tweet_sentiment(self, tweet):
        '''
        Utility function to classify sentiment of passed tweet
        using textblob's sentiment method
        '''
        # create TextBlob object of passed tweet text
        analysis = TextBlob(self.clean_tweet(tweet))
        # set sentiment
        if analysis.sentiment.polarity > 0:
            return 'positive'
        elif analysis.sentiment.polarity == 0:
            return 'neutral'
        else:
            return 'negative'
 
    def get_tweets(self, query, count = 10):
        '''
        Main function to fetch tweets and parse them.
        '''
        # empty list to store parsed tweets
        tweets = []
 
        try:
            # call twitter api to fetch tweets
            fetched_tweets = self.api.search(q = query, count = count)
 
            # parsing tweets one by one
            for tweet in fetched_tweets:
                # empty dictionary to store required params of a tweet
                parsed_tweet = {}
 
                # saving text of tweet
                parsed_tweet['text'] = tweet.text
                # saving sentiment of tweet
                parsed_tweet['sentiment'] = self.get_tweet_sentiment(tweet.text)
 
                # appending parsed tweet to tweets list
                if tweet.retweet_count > 0:
                    # if tweet has retweets, ensure that it is appended only once
                    if parsed_tweet not in tweets:
                        tweets.append(parsed_tweet)
                else:
                    tweets.append(parsed_tweet)
 
            # return parsed tweets
            return tweets
 
        except tweepy.TweepError as e:
            # print error (if any)
            print("Error : " + str(e))

    def get_query_sentiment(self, query):
        tweets = self.get_tweets(query, count=10)
        tweet_sentiments = [self.get_tweet_sentiment(x) for x in tweets]

        threshold = 3

        # if 3 out of 20 tweets are negative, we say that a query is negative
        # otherwise it is positive. This metric takes into account that in general
        # more tweets are positive than negative

        neg_count = 0
        for sentiment in tweet_sentiments:
            if sentiment == 'negative':
                neg_count += 1

        return 'negative' if neg_count >= threshold else 'positive'

 
def main():
    company_name = ' '.join(sys.argv[1:])

    api = TwitterClient()
    company_sentiment = api.get_query_sentiment(company_name)
    print('Sentiment for {} is {}.'.format(company_name, company_sentiment))
 

if __name__ == "__main__":
    main()