require 'json'

module RongCloud
  class Api
    def initialize
      @app_key = ENV['RongCloudAppKey']
      @app_secret = ENV['RongCloudAppSecret']
      @api_host = ENV["RongCloudHost"]
    end

    def check_signature(signature,nonce,timestamp)
      local_signature = Digest::SHA1.hexdigest(@app_secret+nonce+timestamp)
      if signature == local_signature
        return true
      else
        return false
      end
    end

    def header_signature
      nonce = String(rand())
      timestamp = String(Time.now)
      signature = Digest::SHA1.hexdigest(@app_secret+nonce+timestamp)
      return {
        "nonce"=> nonce,
        "timestamp" => timestamp,
        "signature" => signature,
        "App-Key" => @app_key
      }
    end

    def userGetToken(opt={})
      post_url = "#{@api_host}/user/getToken.json"
      opt[:userId] ||= "1"
      opt[:name] ||= "gaogao"
      opt[:portraitUri] ||= ""
      result = HTTParty.post(post_url,body:opt,headers: header_signature)
    end

    def userRefresh(opt={})
      post_url = "#{@api_host}/user/refresh.json"
      opt[:userId] ||= "1"
      opt[:name] ||= "gaogao"
      opt[:portraitUri] ||= ""
      result = HTTParty.post(post_url,body:opt,headers: header_signature)
    end

  end

end
