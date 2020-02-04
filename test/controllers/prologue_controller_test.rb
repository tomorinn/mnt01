require 'test_helper'

class PrologueControllerTest < ActionDispatch::IntegrationTest
  test "should get begin" do
    get prologue_begin_url
    assert_response :success
  end

end
