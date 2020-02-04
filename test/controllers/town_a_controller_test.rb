require 'test_helper'

class TownAControllerTest < ActionDispatch::IntegrationTest
  test "should get street" do
    get town_a_street_url
    assert_response :success
  end

end
