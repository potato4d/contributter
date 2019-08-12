export type ContributionLog = {
  date: string
  count: number
}

export type Environments = {
  twitter: {
    ck: string
    cs: string
  }
}

export type TweetRequest = {
  uid: string
}

export type UserData = {
  uid: string
  GitHubID?: string
  TwitterID: string

  iconURL: string
  accessToken: string
  accessSecret: string

  enabled: boolean
}
