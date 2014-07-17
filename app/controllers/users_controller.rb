class UsersController < ApplicationController
	def new
		@user = User.new
	end
	def create
		@user = User.new(params_user)
		if @user.save
			redirect_to home_path
end