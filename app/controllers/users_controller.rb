class UsersController < ApplicationController

    def create
        user = User.new(user_params)
        if user.save
            session[:username] = user.username
            render json: { user_id: user.id, success: true, token: session, success_message: "User created!" }
        else
            render json: { success: false, errors: user.errors.full_messages }
        end
    end

    private

    def user_params
        params.permit(:username, :email, :password)
    end

end