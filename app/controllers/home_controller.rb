class HomeController < ApplicationController
	def index
		@playlist = Playlist.create
	end
end