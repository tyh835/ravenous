const apiKey = 'p3cbSVd0pECM4rpBSEUI4mL4kwyEDS3QLNcXygIuAQE1lrIynv0PIHYVXB4ex6iSFQv3jhI1fPv9OEUQ13bw3uZKvwZIos9iK_8AEFC62yj4uXfvWwhUNtzlvmabWnYx';
const Yelp = {
  search(term, location, sortBy) {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {Authorization: `Bearer ${apiKey}`}
    }).then(response => {return response.json();}).then(
      jsonResponse => {if (jsonResponse.businesses && jsonResponse.businesses.every(business => {return business !== undefined}) && jsonResponse.businesses.length !== 0) {
        console.log(jsonResponse.businesses);
        return jsonResponse.businesses.map(
          business => {return {
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: (business.categories[0] ? business.categories[0].title : "No Category"),
            rating: business.rating,
            reviewCount: business.review_count,
            url: business.url
          }}
        );
      } else {
        return "Sorry no results were found";
      }
    });
  }
};

export default Yelp;