from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify)
from model import connect_to_db
import crud

app = Flask(__name__)
app.secret_key = "%?gdb56vf873%"

# login_manager = LoginManager()
# login_manager.init_app(app)

@app.route('/')
def Homepage():
    """View homepage."""

    return render_template('index.html')


@app.route('/api/create-account', methods=["POST"])
def create_account():

    data = request.get_json()

    email = data["email"]
    password = data["password"]
    name = data["name"]

    user = crud.get_user_by_email(email=email)

    if user:
        status = 'error'
        message = 'Account with this email already exists. Please try logging in.'

    else:
        crud.create_user(email=email, password=password, name=name)
        status = 'success'
        message = 'Thank you for creating an account. Please log in.'

    return jsonify({'status': status, 'message': message})


@app.route('/api/login', methods=["POST"])
def login_user():

    data = request.get_json()

    session['email'] = data['email']
    email = data['email']
    password = data['password']

    user = crud.get_user_by_email_password(email=email, password=password)

    if user:
        status = 'success'
        message = 'You have successfully logged in!'

    else:
        status = 'error'
        message = 'Your email or password are incorrect'

    return jsonify({'status': status, 'message': message})


@app.route('/api/logout', methods=["GET", "POST"])
def logout_user():

    if 'email' in session:
        session.pop('email', None)
        status = 'success'
        message = 'You have successfully logged out!'

    else:
        status = 'error'
        message = 'You were not logged in'

    return jsonify({'status': status, 'message': message})


@app.route('/api/user-profile')
def user_profile():

    if 'email' in session:
        profile = crud.get_user_profile_info(email=session['email'])
        # print(profile)
    else:
        profile = []

    return jsonify(profile)


@app.route('/api/latlng-wines')
def wine_markers():

    if 'email' in session:
        profile_data = crud.get_user_profile_info(email=session['email'])
    print("profile_data:", profile_data)

    wines = []

    for i in range(len(profile_data)):
        wines.append(profile_data[i][0])
        print("first_append:",profile_data[i][0] )
        wines.append(profile_data[i][1])
        wines.append(profile_data[i][2])
        wines.append(profile_data[i][3])
        wines.append(profile_data[i][4])
    print("wines_list:", wines)

    wines_data = []

    for wine in wines:

        output = crud.get_wine_by_title(wine)
        print("output:", output)

        wines_data.append(
            {
                'wine_title': output[0].wine_title,
                'lat': output[0].lat,
                'lng': output[0].lng,
                'country': output[0].country,
                'winery': output[0].winery,
                'points': output[0].points,
                'price': output[0].price,
                'variety': output[0].variety
                }
        )
        # refractor output into a dictionary
        # or save each latlng in a dictionary with wine title as key
    print("wines_data:", wines_data)
    return jsonify(wines_data)


@app.route('/api/wine/save-rec', methods=["POST"])
def save_rec():

    data = request.get_json()
    rec_info = data["rec_info"]

    if 'email' in session:
        email = session['email']
        rec = crud.save_recommendation(rec_info=rec_info, user_email=email)
        if rec:
            status = 'success'
            message = 'Recommendation has been saved to your profile!'

        else:
            status = 'error'
            message = 'Something went wrong. Please try saving again.'
    else:
        status = 'error'
        message = 'Please Log In first'

    return jsonify({'status': status, 'message': message})


@app.route('/api/recommendation', methods=["POST"])
def recommendation():
  # print("hitting the rec route \n \n \n")
  # print(request.get_json())

    data = request.get_json()

    min_year = data["min_year"]
    max_year = data["max_year"]
    min_price = data["min_price"]
    max_price = data["max_price"]
    descriptors = data["descriptor"]

    wines = crud.get_wine_by_filters(
        min_year, max_year, min_price, max_price, descriptors)

    results = [wine[0] for wine in wines]

    return jsonify(results)


# ideas of API calls
# GET /api/wine/<wine_id>
# GET /api/user/<user_id>/wine-recommendations

# option 1: benefits - easy to understand, can be slower with making lots api calls at once
# GET /api/wine/years -> json: {years: [1980, 1970, 1960, ...]}
# GET /api/wine/price -> json: {price: [20, 30, 40, ...]}
# option 2: benefits - faster
# ----> GET /api/wine/data -> json: {years: [1980, ...], price: [20, ...]}


if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True)





