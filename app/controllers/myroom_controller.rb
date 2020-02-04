class MyroomController < ApplicationController
  before_action :authenticate_user
  def room
    flash.now[:message] = "ここは自分の部屋。今までの実績とヒントを見ることができる。"
  end
end
