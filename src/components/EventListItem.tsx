import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import { Event } from '../api';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
        key: {
            fontWeight: 700,
        },
        details: {
            flexDirection: "column",
        }
    }),
);

function EventListItem({ event, ...props }: {event: Event}) {
    const classes = useStyles();

    const onClickYes = (e: React.MouseEvent<HTMLButtonElement|HTMLAnchorElement>) => {
        e.stopPropagation();
    };
    const onClickNo = (e: React.MouseEvent<HTMLButtonElement|HTMLAnchorElement>) => {
        e.stopPropagation();
    };

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Grid
                    justify="space-between"
                    container
                    spacing={24 as GridSpacing}
                >
                    <Grid item>
                        <Typography className={classes.heading}>{event.note} ({event.id})</Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={onClickYes}>Yes</Button>
                        <Button variant="contained" color="secondary" onClick={onClickNo}  style={{marginLeft: '20px'}}>No</Button>
                    </Grid>
                </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
                <span><span className={classes.key}>locationId: </span> {event.locationId}</span>
                <span><span className={classes.key}>contractorId: </span> {event.contractorId}</span>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

export default EventListItem;
