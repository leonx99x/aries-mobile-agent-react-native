import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView } from 'react-native';
import { useAgent, useCredentialById } from '@aries-framework/react-hooks'
import { V1ProposeCredentialHandler } from '@aries-framework/core/build/modules/credentials/protocol/v1/handlers';
import { useStore } from '../contexts/store';
import { DispatchAction } from '../contexts/reducers/store';
import { BifoldError } from '../types/error';
import { useTranslation } from 'react-i18next';
import { ContactStackParams, Screens } from '../types/navigators';
import { StackScreenProps } from '@react-navigation/stack';
import { IndyCredentialFormat, ProposeCredentialOptions, V1CredentialService } from '@aries-framework/core';
import { indyDidRegex } from '@aries-framework/core/build/utils';

type CredentialProposalProps = StackScreenProps<ContactStackParams, Screens.CredentialProposal>

const CredentialProposal: React.FC<CredentialProposalProps> = ({ navigation, route }) => {
    const { agent } = useAgent();
    const { connectionId } = route.params;
    const [email, setEmail] = useState('test');
    const [, dispatch] = useStore()
    const credential = useCredentialById('credentialId')
    const { t } = useTranslation()
    const [proposeCredentialOptions, setProposeCredentialOptions] = useState<ProposeCredentialOptions>()

    useEffect(() => {
        console.log(connectionId)
        if (!agent) {
            dispatch({
                type: DispatchAction.ERROR_ADDED,
                payload: [
                    {
                        error: new BifoldError(
                            t('Error.Title1035'),
                            t('Error.Message1035'),
                            t('CredentialOffer.CredentialNotFound'),
                            1035
                        ),
                    },
                ],
            })
        }
    }, [])
    // const options: ProposeCredentialOptions<[IndyCredentialFormat], [V1CredentialService]> = {
    //     comment: 'email proposal',
    //     connectionId: connectionId,
    //     protocolVersion: 'v1',
    //     credentialFormats:
    //     {
    //         schemaIssuerDid: "HEQRhnkMRimjTZEaeejm21",
    //         schemaId: "HEQRhnkMRimjTZEaeejm21:2:email:1.0",
    //         schemaName: "email",
    //         schemaVersion: "1.0",
    //         credentialDefinitionId: "HEQRhnkMRimjTZEaeejm21:3:CL:19:default",
    //         issuerDid: "HEQRhnkMRimjTZEaeejm21",
    //         attributes: [
    //             {
    //                 name: 'email',
    //                 value: email
    //             },
    //         ]
    //     }

    // };
    // async function proposeCredential() {
    //     try {
    //         // Perform the propose credential action using the provided options
    //         const result = await agent?.credentials.proposeCredential(options);

    //         // Update the state or UI to reflect the successful result
    //     } catch (error) {
    //         // Handle the error, such as by displaying an error message or updating the state or UI
    //     }
    const handleSubmit = async () => {
    }
    return (
        //make an email field
        <SafeAreaView style={{ flexGrow: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Credential Proposal</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => setEmail(text)}
                    value={email}
                    placeholder="Email"
                />
                <Button title="Submit" onPress={handleSubmit} />
            </View>
        </SafeAreaView>
    )

}

export default CredentialProposal


