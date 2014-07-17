module Api
	class SongsController < ApplicationController

		respond_to :json

		def index
			if params[:playlist_id]
				playlist = Playlist.find(params[:playlist_id]);
				respond_with playlist.songs
			end			
		end
			
		def create
			song = Song.create params_song
			respond_with song, :status => :created, :location => nil
		end

		def show
    		respond_with Song.find params[:id]
  		end

		def search
			response = youtube_client.videos_by(:query => params[:q], :page => 1, :per_page => 15)
			respond_with response
		end

		def destroy
			song = Song.find(params[:id])
			song.destroy
			respond_with :status => 200
		end

		def params_song
		  params.require(:song).permit(:name,:url,:playlist_id,:video_id,:image_url)
		end  

	end
end