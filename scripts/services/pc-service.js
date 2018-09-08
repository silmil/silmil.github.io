let pcService = (() => {

    function getActive(userId) {
        const endpoint = `pcs?query={"_acl.creator":"${userId}","active":"true"}`;

        return remote.get('appdata', endpoint, 'kinvey');
    }

    function create(name, creator) {
        const data = {
            name: name,
            creator: creator
        };

        return remote.post('appdata', 'pcs', 'kinvey', data);
    };

    function getMyPCs(userId) {
        const endpoint = `pcs?query={"_acl.creator":"${userId}"}`;

        return remote.get('appdata', endpoint ,'kinvey')
    }

    function getById(pcsId){
        const endpoint = `pcs/${pcId}`;

        return remote.get('appdata', endpoint, 'kinvey');
    }

    async function editPC(pcId, name) {
        const endpoint = `pcs/${pcId}`;
        let pc = await getById(pcId);

        pc['name'] = name;

        return remote.update('appdata', endpoint, 'kinvey', pcs)
    }

    return {
        getActive,
        create,
        getMyPCs,
        getById,
    }
})();