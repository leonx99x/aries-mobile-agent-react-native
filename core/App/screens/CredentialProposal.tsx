import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import TextInput from '../components/inputs/TextInput';
import { useAgent, useCredentialById } from '@aries-framework/react-hooks'
import { V1ProposeCredentialHandler } from '@aries-framework/core/build/modules/credentials/protocol/v1/handlers';
import { useStore } from '../contexts/store';
import { DispatchAction } from '../contexts/reducers/store';
import { BifoldError } from '../types/error';
import { useTranslation } from 'react-i18next';
import { ContactStackParams, Screens } from '../types/navigators';
import { StackScreenProps } from '@react-navigation/stack';
import { CredentialState, IndyCredentialFormat, ProposeCredentialOptions, V1CredentialService } from '@aries-framework/core';
import { indyDidRegex } from '@aries-framework/core/build/utils';
import Button, { ButtonType } from '../components/buttons/Button';

type CredentialProposalProps = StackScreenProps<ContactStackParams, Screens.CredentialProposal>

const CredentialProposal: React.FC<CredentialProposalProps> = ({ navigation, route }) => {
    const { agent } = useAgent();
    const { connectionId } = route.params;
    const [email, setEmail] = useState('');
    const [, dispatch] = useStore()
    const credential = useCredentialById('credentialId')
    const { t } = useTranslation()

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
    const options: ProposeCredentialOptions<[IndyCredentialFormat], [V1CredentialService]> = {
        comment: 'email proposal',
        connectionId: connectionId,
        protocolVersion: 'v1',
        credentialFormats:
        {
            indy: {
                attributes: [
                    {
                        name: 'email',
                        value: email,
                    }
                ]
            }
        }

    };
    function proposeCredential() {
        try {
            // Perform the propose credential action using the provided options
            agent?.credentials.proposeCredential(options).then((result) => {
                if (result.state === CredentialState.ProposalSent) {
                    console.log("Credential Proposal Sent")
                }
            })
        } catch (error) {
            // Handle the error
        }
    }
    const handleSubmit = () => {
        try {
            proposeCredential()
        } catch (error) {
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
    }
    return (
        //make an email field
        <SafeAreaView style={{ flexGrow: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Credential Proposal</Text>
                <TextInput
                    label='Email'
                    style={{ borderColor: 'white', borderWidth: 1, width: 200, height: 40 }}
                    onChangeText={text => setEmail(text)}
                    value={email}
                    placeholder="Email"
                />
                <Button
                    title="Submit"
                    buttonType={ButtonType.Primary}
                    onPress={handleSubmit} />
            </View>
        </SafeAreaView>
    );
};
export default CredentialProposal


