class Api::UsersController < Api::ApiController

  def index
    @users = User.all

    render :index
  end

  def show
    @user = User.find(params[:id])

    render :show
  end

  def update
    @user = User.find(params[:id])

    if @user.update(users_params)

      render :show
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end

  end

  private
    def users_params
      params.require(:user).permit(:email, :username, :about_me, :genius_iq, :image)
    end

end
