class RegisterWorker
  include Sidekiq::Worker

  def perform(user_id)
    user = User.find(user_id)
    begin
      c = Contribution.crawl_and_save(user)
      if c
        p 'success'
      else
        p 'skip'
      end
    rescue => e
      p 'fail'
    end
  end
end
