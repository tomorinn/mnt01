require 'test_helper'

class GateControllerTest < ActionDispatch::IntegrationTest
  test "should get enterd" do
    get gate_enterd_url
    assert_response :success
  end

end
