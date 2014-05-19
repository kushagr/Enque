class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :youtube_client

  respond_to :json

  def youtube_client
  	@youtube_client = YouTubeIt::Client.new(:dev_key => "AI39si6wj7PEgLFBitifRhWrz8vQq7D1b4oJuQT8t_CjXZ3LEhg5TIqgXJ5SWVlINROBk1UESjyNaJriR1w3PIDKjELfGFisTg")
  end
end
