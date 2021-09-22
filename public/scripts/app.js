

$(document).ready(function() {


  //Script for messages.ejs - Grab message Id for message modal
  $('#message-reply-modal').on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget) // Button that triggered the modal
    const messageId = button.data('message-id') // Extract info from data-* attributes
    const recipient = button.data('sender-name') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    const modal = $(this)
    modal.find('.modal-title').text('Reply to ' + recipient)
    modal.find('.modal-body input').val(messageId)
  });



  //Script for search-page.ejs - Display the clicked listing only
  $("#listing-cards").click(function(event) {
    event.preventDefault();
    const targetListingId = $(event.target).siblings().html().slice(1);

    $.get(`/api/listings/${targetListingId}`)
      .then((response) => {
        listing = response[0];

        const listingCard = `
        <div class="modal fade" id="message_modal" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header border-0 pb-1">
                <h5 class="modal-title" id="exampleModalLabel">Contact seller </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <form action="/api/messages" method="POST">
                <div class="modal-body pt-0">
                  <label for="user_message" class="form-label"></label>
                  <textarea class="form-control" name="user_message" rows="3" placeholder="Type message"></textarea>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>

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
        res.cookie('listing_id', 'test');

      });

  });
});
