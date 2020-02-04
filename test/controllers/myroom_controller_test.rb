require 'test_helper'

class MyroomControllerTest < ActionDispatch::IntegrationTest
  test "should get room" do
    get myroom_room_url
    assert_response :success
  end

end
