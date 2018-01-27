<center>
  ![Contributter](https://user-images.githubusercontent.com/6993514/35467986-8ff4c902-0359-11e8-98ac-04b28f99a408.png)
</center>


Let's tweet your contributions.  
Original: [https://contributter.potato4d.me](https://contributter.potato4d.me)

## Features

- Crawl GitHub contributions and save database
- Every day at 0 o'clock, we tweet the contribution number on GitHub the day before

## Requirements

- Ruby 2.3+
- node 8.9.0+ with NPM(v5) and Yarn

## ENV values

```bash
export TWITTER_CK=XXXXXXXXXXXXXXXXXXXXXXXXX
export TWITTER_CS=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
export ADMIN_TOKEN=<RANDOM_TOKEN>
export SECURITY_SALT=<RANDOM_SALT>
export SLACK_API_ROOT=<POST_SLACK_REPORT_DOMAIN>
export SLACK_API_ENDPOINT=<POST_SLACK_REPORT_URL>
export SLACK_CHANNEL=<POST_SLACK_REPORT_CHANNEL>
export OWNER_NAME=<POST_SLACK_REPORT_MENTION_USERNAME>
```

## Installation

```bash
$ bundle install
$ ./bin/rails s
```

## LICENSE

### Source code

All source code is released under MIT license.

MIT &copy; 2018 HANATANI Takuma

### Logo and assets

For icon assets, licenses based on CC 3.0 BY are being processed.
In the current revision, contribution to contributter or use of icon after modification for purposes other than hosting is prohibited.

<div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
