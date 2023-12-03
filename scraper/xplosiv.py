import argparse
import requests
from bs4 import BeautifulSoup
import time

def scrape(url):
    # Make an HTTP request to the given URL
    try:
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        response.raise_for_status()  # Will raise an HTTPError if the HTTP request returned an unsuccessful status code
    except requests.exceptions.HTTPError as errh:
        print ("Http Error:",errh)
    except requests.exceptions.ConnectionError as errc:
        print ("Error Connecting:",errc)
    except requests.exceptions.Timeout as errt:
        print ("Timeout Error:",errt)
    except requests.exceptions.RequestException as err:
        print ("OOps: Something Else",err)
    else:
        # Parse the content of the page
        soup = BeautifulSoup(response.content, 'html.parser')
        return soup

def main(url):
    # Use the provided URL to scrape
    soup = scrape(url)
    price_element = soup.find(class_='price-wrapper')
    product_element = soup.find('span', class_='base')
    if price_element and product_element:
        # Extract the data-price-amount attribute
        price_amount = price_element.get('data-price-amount')
        product_name = product_element.text
        print(product_name, price_amount)

# Set up argparse
parser = argparse.ArgumentParser(description='A simple CLI web scraper.')
parser.add_argument('url', type=str, help='The URL to scrape')
args = parser.parse_args()

if __name__ == "__main__":
    # Implement a simple delay to respect the website's server by not overwhelming it with requests
    time.sleep(1) # Sleep for 1 second before starting the scrape to avoid hitting the server too hard
    main(args.url)