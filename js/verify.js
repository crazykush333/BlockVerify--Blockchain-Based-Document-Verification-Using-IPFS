window.CONTRACT = {
  address: '0xfc5374231d3e289458c1aFE4313138EABa9801D5', // Replace with your actual contract address
  network: 'https://polygon-mumbai.infura.io/v3/5f8ce994f52d4ff18b43e61693dc1fee', // Replace with your Infura project URL or other RPC provider URL
  explore: 'https://mumbai.polygonscan.com/',
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: '_exporter',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'string',
          name: '_ipfsHash',
          type: 'string',
        },
      ],
      name: 'addHash',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_add',
          type: 'address',
        },
        {
          internalType: 'string',
          name: '_info',
          type: 'string',
        },
      ],
      name: 'add_Exporter',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'hash',
          type: 'bytes32',
        },
        {
          internalType: 'string',
          name: '_ipfs',
          type: 'string',
        },
      ],
      name: 'addDocHash',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_add',
          type: 'address',
        },
        {
          internalType: 'string',
          name: '_newInfo',
          type: 'string',
        },
      ],
      name: 'alter_Exporter',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_newOwner',
          type: 'address',
        },
      ],
      name: 'changeOwner',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_add',
          type: 'address',
        },
      ],
      name: 'delete_Exporter',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: '_hash',
          type: 'bytes32',
        },
      ],
      name: 'deleteHash',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [],
      name: 'count_Exporters',
      outputs: [
        {
          internalType: 'uint16',
          name: '',
          type: 'uint16',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'count_hashes',
      outputs: [
        {
          internalType: 'uint16',
          name: '',
          type: 'uint16',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: '_hash',
          type: 'bytes32',
        },
      ],
      name: 'findDocHash',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_add',
          type: 'address',
        },
      ],
      name: 'getExporterInfo',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ],
}

const web3 = new Web3(new Web3.providers.HttpProvider(window.CONTRACT.network));
const contract = new web3.eth.Contract(window.CONTRACT.abi, window.CONTRACT.address);

window.onload = async () => {
  $('#loader').hide();
  $('.loader-wraper').fadeOut('slow');
  // Check the URL if it was passed with document hash 
  $('#upload_file_button').attr('disabled', true);
  checkURL();
};

async function verify_Hash() {
  // Show the loading
  $('#loader').show();

  if (window.hashedfile) {
    await contract.methods
      .findDocHash(window.hashedfile)
      .call({ from: window.CONTRACT.address })
      .then((result) => {
        $('.transaction-status').removeClass('d-none');
        window.newHash = result;
        if ((result[0] != 0) && (result[1] != 0)) {
          // Doc Verified
          print_verification_info(result, true);
        } else {
          // Doc not Verified
          print_verification_info(result, false);
        }
      })
      .catch((error) => {
        console.error('Error verifying hash:', error);
        // Hide loader and show error message
        $('#loader').hide();
        // Add error handling logic here if necessary
      });
  }
}

function checkURL() {
  let url_string = window.location.href;
  let url = new URL(url_string);
  window.hashedfile = url.searchParams.get('hash');
  if (!window.hashedfile) return;

  verify_Hash();
}

// get Sha3 Hash from the file
async function get_Sha3() {
  $('#note').html(`<h5 class="text-warning">Your document is being hashed!</h5>`);
  $('#upload_file_button').attr('disabled', false);
  var file = await document.getElementById('doc-file').files[0];
  if (file) {
    var reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = async function (evt) {
      window.hashedfile = await web3.utils.soliditySha3(evt.target.result);
      console.log(`Document Hash : ${window.hashedfile}`);
      $('#note').html(
        `<h5 class="text-center text-info">Document hashed successfully.</h5>`
      );
    };
    reader.onerror = function (evt) {
      console.log('Error reading file');
      return false;
    };
  } else {
    window.hashedfile = null;
    return false;
  }
}

function print_verification_info(result, is_verified) {
  document.getElementById('student-document').src = './assets/notvalid.svg';
  $('#loader').hide();
  if (!is_verified) {
    $('#download-document').hide();
    $('#doc-status').html(`<h3 class="text-danger">
        Your document is not uploaded to Blockchain. Certificate not Verified!
        <i class="text-danger fa fa-times-circle" aria-hidden="true"></i>
      </h3>`);
    $('#file-hash').html(
      `<span class="text-info"><i class="fa-solid fa-hashtag"></i></span> ${truncateAddress(
        window.hashedfile
      )}`
    );
    $('#college-name').hide();
    $('#contract-address').hide();
    $('#blockNumber').hide();
    $('.transaction-status').show();
  } else {
    $('#download-document').show();
    $('#college-name').show();
    $('#contract-address').show();
    $('#blockNumber').show();


    $('#doc-status').html(`<h3 class="text-info">
        Certificate Verified Successfully!
        <i class="text-info fa fa-check-circle" aria-hidden="true"></i>
      </h3>`);
    $('#file-hash').html(
      `<span class="text-info"><i class="fa-solid fa-hashtag"></i></span> ${truncateAddress(
        window.hashedfile
      )}`
    );
    $('#college-name').html(
      `<span class="text-info"><i class="fa-solid fa-graduation-cap"></i></span> ${result[2]}`
    );
    $('#contract-address').html(
      `<span class="text-info"><i class="fa-solid fa-file-contract"></i> </span>${truncateAddress(
        window.CONTRACT.address
      )}`
    );
    $('#blockNumber').html(
      `<span class="text-info"><i class="fa-solid fa-cube"></i></span> ${result[0]}`
    );
    document.getElementById('student-document').src =
      'https://ipfs.io/ipfs/' + result[3];
    document.getElementById('download-document').href = document.getElementById(
      'student-document'
    ).src;
    $('.transaction-status').show();
  }
}

function truncateAddress(address) {
  if (!address) {
    return;
  }
  return `${address.substr(0, 7)}...${address.substr(
    address.length - 8,
    address.length
  )}`;
}
