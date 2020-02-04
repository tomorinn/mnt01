class TownAController < ApplicationController
  before_action :authenticate_user

  def street
    if @current_user.level == 1
      @current_user.level = 2;
      @current_user.save
    end
  end



end
