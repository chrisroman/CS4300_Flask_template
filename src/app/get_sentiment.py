import re
import tweepy
import sys
from tweepy import OAuthHandler
from textblob import TextBlob
import os
 
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

        # TODO: Change the above to use environment variables
        # api_key = os.environ['TWITTER_API_KEY']
        # api_secret = os.environ['TWITTER_API_SECRET']
        # access_token = os.environ['TWITTER_ACCESS_TOKEN']
        # access_token_secret = os.environ['TWITTER_ACCESS_SECRET']
 
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
        return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", unicode(tweet)).split())
 
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

    def get_company_sentiment_descriptor(self, company_name):
        '''
        @returns: Tuple - (sentiment_val, descriptor)
        - sentiment_val is the sentiment score
        - descriptor is the description given this sentiment score
        '''
        tweets = self.get_tweets(company_name, count=100)
        tweet_sentiments = [self.get_tweet_sentiment(x) for x in tweets]

        # negative tweets carry weight -2, positive carry weight +1, neutral carry weight +0
        val_map = {'negative':-2, 'positive':1, 'neutral':0}
        sentiment_val_arr = [val_map[x] for x in tweet_sentiments]
        sentiment_val = sum(sentiment_val_arr)
        
        print("TWEETS: ", tweets)
        print("SENTIMENT ARRAY: ", sentiment_val_arr)

        try:
          if sentiment_val < 0:
              neg_tweet_example = str(tweets[sentiment_val_arr.index(-2)]['text'].encode(sys.stdout.encoding, errors='replace'))
              descriptor = 'Twitter sentiment analysis shows that there is a substantial number of negative tweets surrounding ' \
              + company_name \
              + '.  This may signal a controversial public presence, which should be taken into account when performing future research.' \
              + 'An example of a negative tweet is shown below:\n\n' \
              + neg_tweet_example
          else:
              pos_tweet_example = str(tweets[sentiment_val_arr.index(1)]['text'].encode(sys.stdout.encoding, errors='replace'))
              descriptor = 'Twitter sentiment analysis shows that tweets surrounding ' \
              + company_name \
              + ' are largely positive. ' \
              + 'This may signal a company with a strong public presence and good public relations, which should be taken into account when performing future research.' \
              + 'An example of a positive tweet is shown below: \n \n' \
              + pos_tweet_example
        except:
          descriptor = "No description available..."

        return (sentiment_val, descriptor)

 
# company_name = "Slack"
# api = TwitterClient()
# company_sentiment = api.get_company_sentiment_descriptor(company_name)
# print(company_sentiment)
