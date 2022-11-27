$('document').ready(() => {

        $.ajax('http://0.0.0.0:5001/api/v1/status').done(function (data) {
                if (data.status === 'OK') {
                        $('#api_status').addClass('available');
                } else {
                        $('#api_status').removeClass('available');
                }
        });

        var amenities = {};
        $('document').on('change', "input[type='checkbox']", () => {
                if (this.checked) {
                        amenities[$(this).data('data-id')] = $(this).data('name');
                } else {
                        delete amenities[$(this).data('data-id')];
                }
                if (Object.keys(amenities).length > 0) {
                        $('.amenities > h4').text(Object.values(amenities).join(', '));
                }
                else {
                        $('.amenities > h4').html('&nbsp;');
                }
        });

        $.ajax({
                type: 'POST',
                url: 'http://0.0.0.0:5001/api/v1/places_search/',
                data: '{}',
                dataType: 'json',
                contentType: 'application/json',
                success: (data) => {
                        data.forEach((element) => {
                                place = element;
                                $('.places').append(`<article><h2>${place.name}</h2><div class="price_by_night"><p>$${place.price_by_night}</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>${place.max_guest}</p></div><div class="number_rooms"><div class="bed_image"></div><p>${place.number_rooms}</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>${place.number_bathrooms}</p></div></div><div class="description"><p>${place.description}</p></div></article>`);
                        });
                }
        });
});