class Song
	include Mongoid::Document
	include Mongoid::Timestamps

	field :name
	field :url
	belongs_to :playlist

end
