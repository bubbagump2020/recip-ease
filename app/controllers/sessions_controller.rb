class SessionsController < ApplicationController

    def login
        user = User.find_by(username: login_params[:username])
        if(user && user.authenticate(login_params[:password]))
            session[:username] = user.username
            reset_session
            render json: { user_id: user.id, user_name: user.username, success: true, token: session, message: "Login Successful" }
        else
            render json: { success: false, errors: "Login Failed. Username or Password incorrect"  }
        end
    end

    def logout
        session.delete(:current_user_id)
        @current_user = nil
        reset_session
        render json: { logout_message: "Logged Out"}
    end

    

    private

    def login_params
        params.permit(:username, :password)
    end

end
