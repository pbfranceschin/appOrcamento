// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OrcamentoUniao2023 is ERC1155, Ownable {
    
    /**
     * @dev mapping address to policy area to bool
     * @notice this format is used because an organization can be active in multiple policy area
     */
    mapping(address => mapping(uint256 => bool)) private _orgArea;

    /**
     * @dev mapping address to name of org
     */
    mapping(address => string) _orgName;

    /**
     * @dev mapping name to address of org
     */
    mapping(string => address) _orgAddress;
 
    //
    uint256 public OUTROS = 0;
    uint256 public EDUCACAO = 1;
    uint256 public INFRA = 2;
    uint256 public SAUDE = 3;
    // 
    uint256[] public AREAS = [OUTROS, EDUCACAO, INFRA, SAUDE ];

    // verba e percentuais da verba destinados a cada area
    // PASSAR PELO CONSTRUCTOR
    uint256 private _budget = 10**12;
    uint256 private _ed = 5;
    uint256 private _infra = 10; 
    uint256 private _health = 5;

    event Registry(address indexed account, uint256 indexed area, bool indexed added, string name);

    constructor() ERC1155("https://console.filebase.com/buckets/app-orcamento/{area}.json") {
        
        _mint(msg.sender, SAUDE, (_budget * _health) / 100, "");
        _mint(msg.sender, EDUCACAO, (_budget * _ed) / 100, "");
        _mint(msg.sender, INFRA, (_budget * _infra) / 100, "");
        uint256 other = 100 - _health - _ed - _infra;
        _mint(msg.sender, OUTROS, (_budget * other) / 100, "");

    }


    // TODO function override que verifica se address ta cadastrado antes de chamar balanceOf

    function getAreas(address org) public view returns(uint256[] memory){
        require(_orgArea[org][OUTROS] == true, "organization not added");
        
        uint[] memory areas = new uint[](AREAS.length);
        uint j = 1;
        for(uint256 i = 1; i < AREAS.length; i++){
            if(_orgArea[org][i] == true){
                areas[j] = i;
                j++;
            }
        }
        return areas;
    }

    function getName(address org) public view returns(string memory){
        return _orgName[org];
    }
    
    function getAddress(string memory name) public view returns(address) {
        return _orgAddress[name];
    }
    

    function safeTransferFrom(
        address from, 
        address to, 
        uint256 area, 
        uint256 amount, 
        bytes memory data
    ) public override {
        require(
            _orgArea[to][area] == true, "this organization does not have permission to receive this budget"
        );
        super.safeTransferFrom(from, to, area, amount, data);
    }
    
    function safeBatchTransferFrom(
        address from, 
        address to, 
        uint256[] memory areas, 
        uint256[] memory amounts, 
        bytes memory data
    ) public override {
        for(uint256 i = 0; i < areas.length; i++){
            require(
                _orgArea[to][areas[i]] == true, "this organization does not have permission to receive part of the batch"
            );
        }
        super.safeBatchTransferFrom(from, to, areas, amounts, data);
    }
    

    function addOrg(address org, uint256 area, string memory name) public onlyOwner {
        require(_orgArea[org][OUTROS] != true, "address already added");

        _setArea(org, OUTROS);
        _orgName[org] = name;
        _orgAddress[name] = org;

        emit Registry(org, OUTROS, true, name);

        if(area != OUTROS){
            emit Registry(org, area, true, name);
            _setArea(org, area);
        }

    }

    function subOrg(address org) public onlyOwner {
        require(_orgArea[org][OUTROS] == true, "address not added");

        uint[] memory areas = getAreas(org);
        for(uint256 i = 0; i < areas.length; i++){
            if(_orgArea[org][areas[i]] == false){
                return;
            }
            emit Registry(org, areas[i], false, _orgName[org]);
            _subArea(org, areas[i]);
        }
    }

    function subArea(address org, uint256 area) public onlyOwner {
        require(area > 0, 'to exclude account altogether use subOrg method');
        require(_orgArea[org][area] == true, 'this account is not registered to the area specified');
        
        emit Registry(org, area, false, _orgName[org]);
        _subArea(org, area);
    }

    function addArea(address org, uint256 area) public onlyOwner{
        require(_orgArea[org][OUTROS] == true, 'Please add organization first');
        require(_orgArea[org][area] != true, "area already set for this organization");

        emit Registry(org, area, true, _orgName[org]);
        _setArea(org, area);
    }

    function _setArea(address org, uint256 area) private {
        _orgArea[org][area] = true;
    }

    function _subArea(address org, uint256 area) private {
        _orgArea[org][area] = false;
    }

 
    ////////////////////////////
    // teste //////////////
    
    // event testeEvento(uint256 input, address caller);
    // uint256 private umValor;

    // function teste(uint256 trossoqualquer) public {
    //     require(trossoqualquer == 0, "trossoqualquer nao eh zero");
    //     umValor = trossoqualquer;
    //     emit testeEvento(umValor, msg.sender);
    // }
    
}