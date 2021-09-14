# IllusiveBot
A discord bot made to interact with the [Illusive](https://github.com/pippinmole/Illusive) API.

## Disclaimer
I made this project back in early 2020. I have no plans on maintaining it, just uploaded it here for archival purposes.

## Building and Running
> **presumptions**: you have git and node properly installed and added to your `path`.   

To build from source, clone the repository:
```
git clone https://github.com/ibra/IllusiveBot
```
Then run:
```
npm install
```
Then rename `config.example.json` to `config,json` and fill in the fields that are not filled in.
```json
{
    "BotToken": "Your Discord Bot token here", 
    "IllusiveToken": "Your Illusive API token here",   
    "Prefix":"ill!",
    "SuccessColor": "#C0C0C0",
    "FailureColor": "#FF0000"
}
```
And finally create a local instance of the bot:
```
node .
```
