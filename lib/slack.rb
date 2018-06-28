class Slack
  def self.post(counts)
    body = {
      text: "<@" + ENV['OWNER_NAME'] + ">\n" + "[Contributter] " + Date.today.strftime("%Y/%m/%d") + "のバッチ実行結果\n\n",
      channel: ENV['SLACK_CHANNEL'],
      attachments: [
        {
          color: '#F3E2C8',
          text: 'Summary',
          fields: [
            {
              title: '成功数',
              value: counts[:success].to_s,
              short: true
            },
            {
              title: '失敗数',
              value: counts[:fail].to_s,
              short: true
            },
            {
              title: 'スキップ数',
              value: counts[:skip].to_s,
              short: true
            },
            {
              title: '合計ユーザー数',
              value: counts[:total].to_s,
              short: true
            }
          ]
        }
      ]
    }
    conn = Faraday.new(:url => ENV['SLACK_API_ROOT'])
    conn.post do |req|
      req.url ENV["SLACK_API_ENDPOINT"]
      req.headers['Content-Type'] = 'application/json'
      req.body = body.to_json
    end
  end
end
