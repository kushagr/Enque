class Playlist 
	include Mongoid::Document
	include Mongoid::Timestamps

	belongs_to :user
	has_many :songs

	def self.fetch params
		if params[:playlist_id]
			return self.find(params[:playlist_id])
		else
			return false
		end
	end

end
