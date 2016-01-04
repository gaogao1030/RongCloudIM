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


    def groupSync(opt={})
      post_url = "#{@api_host}/group/sync.json"
      opt[:userId] ||= "1"
      result = HTTParty.post(post_url,body:opt,headers: header_signature)
      check_response(result)
    end

    def groupCreate(opt={})
      post_url = "#{@api_host}/group/create.json"
      opt[:userId] ||= "1"
      opt[:groupId] ||= "1"
      opt[:groupName] ||= ""
      result = HTTParty.post(post_url,body:opt,headers: header_signature)
      check_response(result)
    end

    def groupJoin(opt={})
      post_url = "#{@api_host}/group/join.json"
      opt[:userId] ||= "1"
      opt[:groupId] ||= "1"
      opt[:groupName] ||= ""
      result = HTTParty.post(post_url,body:opt,headers: header_signature)
      check_response(result)
    end

    def groupQuit(opt={})
      post_url = "#{@api_host}/group/quit.json"
      opt[:userId] ||= "1"
      opt[:groupId] ||= "1"
      result = HTTParty.post(post_url,body:opt,headers: header_signature)
      check_response(result)
    end

    def groupDismiss(opt={})
      post_url = "#{@api_host}/group/dismiss.json"
      opt[:userId] ||= "1"
      opt[:groupId] ||= "1"
      result = HTTParty.post(post_url,body:opt,headers: header_signature)
      check_response(result)
    end

    def groupRefresh(opt={})
      post_url = "#{@api_host}/group/refresh.json"
      opt[:groupId] ||= "1"
      opt[:groupName] ||= ""
      result = HTTParty.post(post_url,body:opt,headers: header_signature)
      check_response(result)
    end

    def groupUserQuery(opt={})
      post_url = "#{@api_host}/group/user/query.json"
      opt[:groupId] ||= "1"
      result = HTTParty.post(post_url,body:opt,headers: header_signature)
      check_response(result)
    end

    def groupUserGagAdd(opt={})
      post_url = "#{@api_host}/group/user/gag/add.json"
      opt[:userId] ||= "1"
      opt[:groupId] ||= "1"
      opt[:minute] ||= "60"
      result = HTTParty.post(post_url,body:opt,headers: header_signature)
      check_response(result)
    end

    def groupUserGagRollback(opt={})
      post_url = "#{@api_host}/group/user/gag/rollback.json"
      opt[:userId] ||= "1"
      opt[:groupId] ||= "1"
      result = HTTParty.post(post_url,body:opt,headers: header_signature)
      check_response(result)
    end

    def groupUserGagList(opt={})
      post_url = "#{@api_host}/group/user/gag/list.json"
      opt[:groupId] ||= "1"
      result = HTTParty.post(post_url,body:opt,headers: header_signature)
      check_response(result)
    end
  end
end

