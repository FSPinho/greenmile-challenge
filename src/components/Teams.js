import React, { Component } from 'react';
import { Button } from 'react-materialize'
import { Table, Thead, Th, Tr, Td } from 'reactable';
import Request from 'react-http-request';
import fetchJsonp from 'fetch-jsonp'

export class TeamsTable extends Component {

    getTeam(id) {
        var self = this;
        return fetchJsonp('http://jiujitsuteam.herokuapp.com/teams/' + id + '.json')
        .then(function(response) {
            return response.json();
        }).then(function(team){
            if(team.places.length === 0) {
                self.state.teams.push({
                    equipe: team.name, 
                    academia: '-', 
                    endereco: '-'
                });
            } else {
                team.places.map(function(place) {
                    return self.state.teams.push({
                        equipe: team.name, 
                        academia: place.gym.title, 
                        endereco: place.gym.address, 
                        location: {
                            lat: parseFloat(place.gym.lat), 
                            lng: parseFloat(place.gym.lng), 
                        }
                    }); 
                });
            }
        });
        
    }

    getTeams(errorCallback) {
        var self = this;
        return fetchJsonp('http://jiujitsuteam.herokuapp.com/teams.json')
        .then(function(response) {
            return response.json();
        }).then(function(json ){
            
            var promises = [];
            json.map(function(team) {
                return promises.push(self.getTeam(team.id));
            })

            Promise.all(promises).then(function() {
                self.setState({ teams: self.state.teams });
            }, function(err) {
                errorCallback(err)
            });

        });
    }

    constructor() {
		super();

        this.state = { teams: [] };	
	}

	componentDidMount() {
		this.getTeams(function() {
            alert('Erro ao carregar equipes!');
        });
	}

    render() {

        var headers = ['Equipe', 'Academia', 'Endereço'];
        var self = this;
        return (
            <Table className="table" 
                sortable={ true }
                defaultSort={{column: 'equipe', direction: 'asc'}}
                itemsPerPage={ 3 } 
                previousPageLabel={
                    <Button waves='light'>Anterior</Button>
                }
                nextPageLabel={
                    <Button waves='light'>Próximo</Button>
                }>

                <Thead>
                    <Th column="equipe">
                        Equipe
                    </Th>
                    <Th column="academia">
                        Academia
                    </Th>
                    <Th column="endereco">
                        Endereço
                    </Th>
                </Thead>

                {
                    self.state.teams.map(function(team) {
                        return (
                            <Tr className="table-row-hover"
                                onClick={self.props.onTeamSelected.bind(self, team)}>
                                <Td column="equipe">{team.equipe}</Td>
                                <Td column="academia">{team.academia}</Td>
                                <Td column="endereco">{team.endereco}</Td>
                            </Tr>
                        );
                    })
                }

            </Table>
        );
    }

}