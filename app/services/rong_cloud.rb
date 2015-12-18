require 'json'
module RongCloud
  class ResponseError < StandardError
    def initialize(response)
      @response = response
    end

    def code
      @response["code"]
    end

    def message
      @response["errorMessage"]
    end
  end

  class Api
    def initialize
      @app_key = ENV['RongCloudAppKey']
      @app_secret = ENV['RongCloudAppSecret']
      @api_host = ENV["RongCloudHost"]
    end

    def check_response(result)
      raise RongCloud::ResponseError.new(result) unless result["code"] == 200
      return result
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
      check_response(result)
    end

    def userRefresh(opt={})
      post_url = "#{@api_host}/user/refresh.json"
      opt[:userId] ||= "1"
      opt[:name] ||= "gaogao"
      opt[:portraitUri] ||= ""
      result = HTTParty.post(post_url,body:opt,headers: header_signature)
      check_response(result)
    end

    def userGagAdd(opt={})
      post_url = "#{@api_host}/user/gag/add.json"
      opt[:userId] ||= "1"
      opt[:groupId] ||= "1"
      opt[:minute] ||= "60"
      result = HTTParty.post(post_url,body:opt,headers: header_signature)
      check_response(result)
    end

    def userGagRollback(opt={})
      post_url = "#{@api_host}/user/gag/rollback.json"
      opt[:userId] ||= "1"
      opt[:groupId] ||= "1"
      result = HTTParty.post(post_url,body:opt,headers: header_signature)
      check_response(result)
    end

    def userGagList(opt={})
      post_url = "#{@api_host}/group/user/gag/list.json"
      opt[:groupId] ||= "1"
      result = HTTParty.post(post_url,body:opt,headers: header_signature)
      check_response(result)
    end
  end
end

