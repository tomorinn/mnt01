Rails.application.routes.draw do

  get 'town_a/street' => 'town_a#street'
  get 'myroom/room' => 'myroom#room'
  get 'gate/enterd' => 'gate#enterd'
  get 'prologue/begin' => 'prologue#begin'
  get 'users/login_test_F' => 'users#login_test_F'
  get 'users/login_test_S' => 'users#login_test_S'
  get 'users/show' => 'users#show'
  get '/' => 'home#top'

  post 'login' => 'users#login'
  post 'create' => 'users#create'
  post 'logout' => 'users#logout'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
