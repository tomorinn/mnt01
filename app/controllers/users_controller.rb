class UsersController < ApplicationController

  def show
  end

  def login
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      if @user.level >= 2
        redirect_to("/town_a/street")
      else
        redirect_to("/prologue/begin")
      end
    else
      render('home/top')
    end
  end

  def create
    @user = User.new(
      name: params[:name],
      email: params[:email],
      password: params[:password],
      level: 1
    )
    @user.save
    if @user.save
      redirect_to('/prologue/begin')
    end

  end

  def logout
    session[:user_id] = nil
    redirect_to("/");
  end

  def login_test_S
  end

  def login_test_F
  end
end
