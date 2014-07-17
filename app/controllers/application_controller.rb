class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  helper_method :youtube_client

  

  def youtube_client
  	@youtube_client = YouTubeIt::Client.new(:dev_key => "AI39si6wj7PEgLFBitifRhWrz8vQq7D1b4oJuQT8t_CjXZ3LEhg5TIqgXJ5SWVlINROBk1UESjyNaJriR1w3PIDKjELfGFisTg")
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :username
  end
  
end
