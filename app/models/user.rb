class User 
	include Mongoid::Document
	include Mongoid::Timestamps

	field :name
	has_one :playlist

end