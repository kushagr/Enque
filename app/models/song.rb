class Song
	include Mongoid::Document
	include Mongoid::Timestamps

	field :name
	field :url
	field :image_url
	field :video_id
	belongs_to :playlist
end
