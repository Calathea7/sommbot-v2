import crud
import main
import model
import googlemaps

gmaps = googlemaps.Client(key='AIzaSyBTVa4w0Bjwaq6azDxGnnPoZhZ7lgcM-L8')

model.connect_to_db(main.app)

wines = crud.all_wines()
for wine in wines:
    province = wine.province
    appelation = wine.appelation
    if province == None or appelation == None:
        continue
    else:
        geo_input = (appelation, province)
        geo_input = (", ").join(geo_input)
        # geo_input = str(geo_input)
        # print("geo_input:", geo_input)
        geo_coords = gmaps.geocode(geo_input)
        # geo_coords = geocoder.google(geo_input)
        # print("geo_object:", geo_coords)
        if geo_coords == []:
            continue
        else:
            lat = geo_coords[0]["geometry"]["location"]["lat"]
            lng = geo_coords[0]["geometry"]["location"]["lng"]
            # print(wine.id)
            # print(wine.wine_title)
            # print("lat coords:", lat)
            # lat = geo_coords.latlng[0]
            # print("lat", lat)
            # lng = geo_coords.latlng[1]
            # print("lng", lng)
            crud.save_latlng_for_wines(lat, lng, province, appelation)


# [{'address_components':
# [{'short_name': 'Amity Hills', 'types':
#  ['establishment', 'natural_feature'],
#  'long_name': 'Amity Hills'},
#  {'short_name': 'Yamhill County',
#  'types': ['administrative_area_level_2', 'political'],
#  'long_name': 'Yamhill County'},
#  {'short_name': 'OR',
#  'types': ['administrative_area_level_1', 'political'], 'long_name': 'Oregon'},
#   {'short_name': 'US', 'types': ['country', 'political'],
#   'long_name': 'United States'},
#   {'short_name': '97101', 'types': ['postal_code'], 'long_name': '97101'}],
#   'geometry': {'location_type': 'APPROXIMATE',
#   'viewport': {'southwest': {'lng': -123.1797212, 'lat': 45.1233559},
#   'northeast': {'lng': -123.1477064, 'lat': 45.1390995}},
#   'location': {'lng': -123.1637138, 'lat': 45.1312282}},
#   'place_id': 'ChIJeSwhtQ9OlVQRr1RneWzpXDE',
#   'types': ['establishment', 'natural_feature'],
#   'formatted_address': 'Amity Hills, Oregon 97101, USA'}]



# >>> import geocoder
# >>> g = geocoder.google('Mountain View, CA')
# >>> g.latlng
# (37.3860517, -122.0838511)

# 1. get appelation, country as a tuple from db
# 2. pass that tuple into geocoder instance
# 3. get lat from geocoder results and plug into crud func
# 4. do step 3 for lng
# 5. commit changes to db

# province: like a state in USA or a region/province in other countries
# appelation: a little more specific area

# URL = "https://maps.googleapis.com/maps/api/geocode/json"
#     PARAMS = {'key':key,'address': address}
#     res = requests.get(url = URL, params = PARAMS)
