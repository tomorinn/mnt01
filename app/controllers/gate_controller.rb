class GateController < ApplicationController
  before_action :authenticate_user
  def enterd
    flash.now[:message] = "どうやらこの暮石の謎をとかないと町に入れないらしい。怪しいところを調べよう。"
  end

end
