class Crawler
  def self.get(user_id)
    html = Nokogiri::HTML(open('https://github.com/users/' + user_id + '/contributions'))
    date = html.css('rect')[-1].attributes['data-date'].value
    count = html.css('rect')[-1].attributes['data-count'].value.to_i
    return {
      date: date,
      count: count
    }
  end
end
