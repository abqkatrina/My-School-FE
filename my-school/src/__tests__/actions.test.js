import { getUserByID, getFamilyName, deleteAccount } from '../redux/actions/user-actions';
import { getAllActivitiesForUser, editActivityWithoutPhoto, editActivity, deleteActivity } from '../redux/actions/portfolio-actions';
import { registerAssertions } from 'redux-actions-assertions/jest'
import thunk from 'redux-thunk';
import { registerMiddlewares } from 'redux-actions-assertions';

registerMiddlewares([ thunk ]);

describe('testing all actions to make sure they run when invoked and the first action creator gets dispatch before async operatiosn', () => {

    beforeEach(registerAssertions);
    
    it('testing the getUserByID', (done)=> {
        expect(getUserByID(3)).toDispatchActions([{"type":"FETCH_USER"},{"type":"SET_USER","payload":{"id":3,"name":"Jim","username":"jimmy","password":"admin","email":"jimmy@test.com","profile_picture":null,"family_id":3,"user_type_id":2,"familyName":"O'Reilly","userType":"student"}}], done);
    })
    it('testing the getFamilyName', (done)=> {
        expect(getFamilyName()).toDispatchActions([{ type: 'FETCH_FAMILY' }], done);
    })
    it('testing the getFamilyNameByID', (done)=> {
        expect(getFamilyName()).toDispatchActions([{ type: 'FETCH_FAMILY' }], done);
    })
    it('testing the deleteAccount', (done)=> {
        expect(deleteAccount()).toDispatchActions([{ type: 'DELETE_USER' }], done);
    })
    it('testing the etAllActivitiesForUser', (done)=> {
        expect(getAllActivitiesForUser()).toDispatchActions([{ type: 'FETCHING_ACTIVITIES' }], done);
    })
    it('testing the editActivityWithoutPhoto', (done)=> {
        expect(editActivityWithoutPhoto()).toDispatchActions([{ type: 'ADDING_ACTIVITY' }], done);
    })
    it('testing the editActivity', (done)=> {
        expect(editActivity()).toDispatchActions([{ type: 'ADDING_ACTIVITY' }], done);
    })
    it('testing the deleteActivity', (done)=> {
        expect(deleteActivity()).toDispatchActions([{ type: 'DELETING_ACTIVITY' }], done);
    })
})