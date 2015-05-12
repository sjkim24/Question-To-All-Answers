class UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.save
      

  end

  def new
  end

  def show
  end

  def edit
  end

  def update
  end


  private
    def user_params
      params.require(:user).permit(:email, :username, :password, :about_me )
    end


end
