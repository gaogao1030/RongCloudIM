class HomeController < ApplicationController
  layout :false

  def index
    if current_user
      redirect_to chat_index_path
    end
  end
end
