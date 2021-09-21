$(document).ready(function() {
  // $.ajax({
  //   method: "GET",
  //   url: "/api/listings/search"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;
  $("#listing-cards").click(function(event) {
    event.preventDefault();
    const targetListingId = $(event.target).siblings().html().slice(1);

    $.get(`/api/listings/${targetListingId}`)
      .then((response) => {
        listing = response[0];

        const listingCard = `
        <div class="album py-5 bg-light">
          <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" id="listing-cards">
                <div class="col">
                  <div class="card shadow-sm">
                    <img src="${listing.picture}" class="img-fluid" alt="listing image" style="height: 30vw;">
                    <div class="card-body">
                      <dl class="row">
                        <h5 class="card-title col-8">${listing.name}</h5>
                        <figure class="text-end col-4">
                          <h6>$${listing.price.toLocaleString()}</h6>
                        </figure>
                      </dl>
                      <p class="card-text">${listing.description.slice(0, 40)}</p>
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                          <span class="d-none">${listing.id}</span>
                          <button name="view-button" type="submit" class="btn btn-med btn-outline-secondary">View</button>
                          <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#message_modal">Message</button>
                          <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="button">Like</button>
                        </div>
                        <small class="text-muted">${listing.visits} visits</small>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        `
        const $bodyMainTag = $('main');
        $bodyMainTag.empty();
        $bodyMainTag.append(listingCard);

      });

  });
});
