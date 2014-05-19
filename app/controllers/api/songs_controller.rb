module Api
	class SongsController < ApplicationController

		def search
			response = youtube_client.videos_by(:query => params[:query], :page => 1, :per_page => 20)
			respond_with response
		end

	end
end